
import Validator from 'async-validator';
export default {
    methods: {
        /* 
        1. 逐个校验
        2. 保持原有的失去焦点、数据改变时，实时校验以及必填项时红星标记
        3. 可以通过 .el-form-item__error{ display:none; }来隐藏提示，从而得到一个没有实时校验的假象
        4. 需要按element-ui form组件的规范，即必须有:model、:rules、prop
        */
        /* myValidate (formName,callback) {
            let vm = this;
            let fields = vm.$refs[formName].fields;
            let valid = true;
            let error = '';
            for(var i = 0;i<fields.length;i++){
                if(!!valid){
                    fields[i].validate('',errors=>{
                    if(errors){
                        valid = false;
                        error = errors;
                        return false; // 一遇到错误就终止接下来的校验
                    }
                    })
                }
            }
            callback(error);
        }, */
        /* 
        1. 逐个校验
        2. 除了:rules可以不写，其它都需要按照原有规范（因为需要按顺序来校验，当然通过数据的顺序也能达到目的，但是处理html比数据来调整顺序更舒服，况且element-ui本来就这样，能拿来用就拿来用）
        3. 没有了原有的失去焦点、数据改变时，实时校验以及没有必填时的红星标记，因为选择这种方法就是实在不想再用之前的错误提示了
        4. 可以在form-item上添加 :require="true"来添加必填标志  
        5. 本想试着拿到所有form-item，然后再判断规则是否有require，但是发现行不通，因为该require是单向的（props）
        6. prop和rules是同时存在或者不存在
        */
        myValidate (formName,callback) {
            let vm = this;
            return new Promise(resolve=>{
              let validateMessage = '';
              let rules = {};
              let model = vm.$refs[formName].model;
              let fields = vm.$refs[formName].fields;
              for(var i =0,item;item = fields[i++];){
                if(!!!item.prop){
                  throw new Error('prop is must existence!!')
                }
                for(var j in vm.rules){
                  if(j == item.prop){
                    rules[j] = vm.rules[j];
                  }
                }
              }
              const validator = new Validator(rules);
              validator.validate(model, (errors, fields) => {
                // validateMessage = errors ? errors[0].message : '';
                // 加了国际语言切换
                validateMessage = errors ? (vm.$t(errors[0].message)||'') : '';
                resolve(validateMessage);
                if(typeof callback === 'function'){
                  callback(validateMessage);
                }
              });
            })
        },
    }
};