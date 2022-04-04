const toUpper = str => str.charAt(0).toUpperCase() + str.slice(1);
const toCamel = arr => arr.reduce((a, b) => a + toUpper(b));

const getModule = async name => {
    // @todo Make it more flexible
    // For now it use alias from Webpack config, @see https://github.com/19h47/19h47-scripts/blob/main/config/webpack.resolve.alias.js
    const module = await import(`@/scripts/modules/${name}` /* webpackChunkName: "module-[request]" */);

    return module.default;
};

const destroyModule = module => {
    module.mDestroy();
    module.destroy();
};

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
        // eslint-disable-next-line no-await-in-loop
        await callback(array[index], index, array);
    }
};

export default class {
    constructor(options) {
        // eslint-disable-next-line no-unused-expressions
        this.app;
        this.modules = options.modules || [];
        this.currentModules = {};
        this.activeModules = {};
        this.newModules = {};
        this.moduleId = 0;
    }

    async init(app, scope) {
        // console.clear();
        // console.info('✨ Modular initialized');

        await this.collectModules(app, scope);
        this.initModules(scope);
    }

    async collectModules(app, scope) {
        // console.info('✨ Modules collected');

        const container = scope || document;
        const elements = [...container.querySelectorAll('*')].filter(el =>
            [...el.attributes].some(attr => attr.name.startsWith('data-module')),
        );

        if (app && !this.app) {
            this.app = app;
        }

        this.activeModules.app = { app: this.app };

        await asyncForEach(elements, async el => {
            await asyncForEach([...el.attributes], async ({ name, value }) => {
                if (name.startsWith('data-module')) {
                    const dataName = name.split('-').splice(2);

                    let moduleExists = false;
                    const moduleName = toUpper(toCamel(dataName));

                    if (this.modules[moduleName]) {
                        moduleExists = true;
                    } else {
                        const module = await getModule(moduleName);

                        this.modules[moduleName] = module;
                        moduleExists = true;

                        // console.log(`📥 Module ${moduleName} imported`);
                    }

                    if (moduleExists) {
                        const options = {
                            el,
                            name: moduleName,
                            dataName: dataName.join('-'),
                        };

                        const module = new this.modules[moduleName](options);
                        let id = value;

                        if (!id) {
                            this.moduleId += 1;
                            id = `m${this.moduleId}`;
                            el.setAttribute(name, id);
                        }

                        this.addActiveModule(moduleName, id, module);

                        const moduleId = `${moduleName}-${id}`;

                        // console.log(this.newModules);

                        if (scope) {
                            this.newModules[moduleId] = module;
                        } else {
                            this.currentModules[moduleId] = module;
                        }
                    }
                }
            });
        });
    }

    initModules(scope) {
        // console.log(`✨ Modules initialized`);

        Object.entries(this.currentModules).forEach(([id, module]) => {
            if (scope) {
                // console.log(`✅ Module ${id} activated`);

                const split = id.split('-');
                const moduleName = split.shift();
                const moduleId = split.pop();

                this.addActiveModule(moduleName, moduleId, module);
            } else {
                // console.log(`✅ Module ${id} initialized`);

                this.initModule(module);
            }
        });
    }

    initModule(module) {
        // console.info(`✨ Module initialized`);

        module.mInit(this.activeModules);
        module.init();
    }

    addActiveModule(name, id, module) {
        // console.info(`Modular.addActiveModule()`, name, id, this.activeModules[name]);

        if (this.activeModules[name]) {
            Object.assign(this.activeModules[name], { [id]: module });
        } else {
            this.activeModules[name] = { [id]: module };
        }
    }

    async update(scope) {
        // console.info(`🏀 Modular.update()`, scope);

        await this.init(this.app, scope);

        // eslint-disable-next-line no-unused-vars
        Object.entries(this.currentModules).forEach(([_, module]) =>
            module.mUpdate(this.activeModules),
        );

        // eslint-disable-next-line no-unused-vars
        Object.entries(this.newModules).forEach(([_, module]) => this.initModule(module));

        Object.assign(this.currentModules, this.newModules);
    }

    destroy(scope) {
        // console.info(`🗑 Modular.destroy()`, scope);

        if (scope) {
            this.destroyScope(scope);
        } else {
            this.destroyModules();
        }
    }

    destroyScope(scope) {
        const elements = scope.querySelectorAll('*');

        elements.forEach(el => {
            Array.from(el.attributes).forEach(i => {
                if (i.name.startsWith('data-module')) {
                    const id = i.value;
                    const dataName = i.name.split('-').splice(2);
                    let moduleName = `${toCamel(dataName)}-${id}`;
                    let moduleExists = false;

                    if (this.currentModules[moduleName]) {
                        moduleExists = true;
                    } else if (this.currentModules[toUpper(moduleName)]) {
                        moduleName = toUpper(moduleName);
                        moduleExists = true;
                    }

                    if (moduleExists) {
                        destroyModule(this.currentModules[moduleName]);

                        delete this.currentModules[moduleName];
                    }
                }
            });
        });

        this.activeModules = {};
        this.newModules = {};
    }

    destroyModules() {
        // eslint-disable-next-line no-unused-vars
        Object.entries(this.currentModules).forEach(([_, module]) => destroyModule(module));

        this.currentModules = [];
    }
}

export { default as module } from './module';
