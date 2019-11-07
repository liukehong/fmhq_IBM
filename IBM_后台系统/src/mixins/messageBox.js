export default {
    methods: {
        // 接口获取用户信息
        fnOpenMessageBox(text,type) {
            let vm = this;
            vm.$confirm(text, vm.$t('system_container.tips'), {
                confirmButtonText: vm.$t('system_container.ok'),
                // type: 'warning',
                type: type||'error',
                center: true,
                showCancelButton: false,
                showClose: false,
                confirmButtonClass: 'newClass'
            }).then(() => {
            }).catch(()=>{
            })
        },
    }
};