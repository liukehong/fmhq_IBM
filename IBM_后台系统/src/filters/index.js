import filters from './filter'
const install = Vue => {
    if (install.installed) 
        return;
    install.installed = true;
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
}
export default install