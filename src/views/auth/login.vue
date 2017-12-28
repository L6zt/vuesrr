<template>
    <div class="auth-login-container">
        <section class="login-warp_con">
            <h3 class="login-title" v-once> 欢迎，登陆！！！</h3>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-ruleForm" labelPosition="right">
                <el-form-item label="用户名"  prop="name" size="small">
                    <el-input  v-model="ruleForm.name" auto-complete="off" :disabled="btnState"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" size="small">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off"  size="small" :disabled="btnState"></el-input>
                </el-form-item>
            </el-form>
            <div class="post-warp_con">
                <el-button
                        type="primary"
                        size="small"
                        :disabled="btnState"
                        @click="submitForm('ruleForm')">
                    {{btnName}}
                </el-button>
            </div>
        </section>
    </div>
</template>
<script>
	import {mapState} from 'vuex'
	export default {
		metaInfo () {
			return {
				title: '服务器login',
				meta: [
					{ vmid: 'description', name: 'description', content: '我是login' }
				]
			}
		},
		data() {
			return {
				btnState: false,
				ruleForm: {
					name: '',
					password: ''
                },
				rules: {
					name: [
					    {required: true, message: '用户名不能为空',trigger: 'blur'}
					],
                    password: [
                    	{required: true, message:'密码不能为空',trigger: 'blur'}
                    ]
				}
			};
		},
        computed: {
			btnName () {
				const nameList = ['登陆', '正在为您跳转...']
                return this.btnState ? nameList[1] : nameList[0]
            }
        },
		methods: {
			submitForm(formName) {
				const comp = this.$refs[formName]
				comp.validate((valid) => {
					if (valid) {
						this.$store.dispatch('auth/login', this.ruleForm).then(data => {
							this.$message({
                                message: '登陆成功',
                                type: 'success'
                            })
                            this.btnState = true
                            setTimeout(() => {
								this.$router.push('/')
                            }, 500)
						}).catch(e => {
							this.$message({
								message: e,
								type: 'warning'
							})
							comp.resetFields()
                        })
					}
				});
			}
		},
        mounted () {
        }
	}
</script>
<style>
    @import "../../assert/css/var/var.css";
    .auth-login-container {
        position: relative;
        width: 100%;
        height: 100%;
        background: $background-default;
        .login-warp_con {
            position: fixed;
            padding: 10px 10px 0 10px;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 400px;
            height: 200px;
            background: #fff;
            border-radius: 5px;
            .login-title {
                text-align: center;
                font-size: 16px;
                padding: 10px 0 20px;
            }
            .post-warp_con {
                button {
                    position: relative;
                    display: block;
                    width: 75%;
                    margin: 0 auto;
                }
            }
        }
    }
</style>