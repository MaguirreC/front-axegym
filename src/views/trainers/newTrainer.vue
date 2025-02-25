<template>
<form class="row g-3" ref="formRef">
  <div class="col-md-6">
    <label for="inputName" class="form-label">Name</label>
    <input type="text" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
  </div>
  <div class="col-md-6">
    <label for="inputIdentification" class="form-label">Identification</label>
    <input v-model="form.identification" type="text" class="form-control" id="inputIdentification" placeholder="Identificatión">
  </div>
  <div class="col-6">
    <label for="inputPhoneNumber" class="form-label">Phone number</label>
    <input v-model="form.phoneNumber" type="text" class="form-control" id="inputPhoneNumber" placeholder="Phone Number">
  </div>
  <div class="col-3">
    <label for="inputDateOfBirth" class="form-label">Date of birth</label>
    <input v-model="form.dateOfBirth" type="date" class="form-control" id="inputDateOfBirth" placeholder="Date of birth">
  </div> 
  <div class="col-12">
    <button type="submit" class="btn btn-primary" @click="onSubmit">Sign in</button>
  </div>
</form>


</template>
<script setup>
import axios from 'axios';
import { reactive,ref } from 'vue';
import { ElMessage } from 'element-plus'

const apiBaseUrl = import.meta.env.VITE_API_URL;
const formRef=ref()
const form= reactive({
  name:'',
  identification:'',
  phoneNumber:'',
  dateOfBirth:''

});
const onSubmit = async()=>{
  event.preventDefault();
  newTrainer()
}

const url = `${apiBaseUrl}/trainers`
const newTrainer = async()=>{

  const dataForm={
    name: form.name,
    identification:form.identification,
    phoneNumber:form.phoneNumber,
    dateOfBirth:form.dateOfBirth
  }
  try{
    axios.post(url,dataForm)
          .then(function(response){
            console.log(response);
            resetForm()
            ElMessage({
                    message: 'trainer successfully added    .',
                    type: 'success',
                })
                
          })
          .catch(function(error){
            console.log(error)
          });
  } catch(error){
    console.error('error client')
  }
}
const resetForm = () => {
  form.name = '';
  form.identification = '';
  form.phoneNumber = '';
  form.dateOfBirth = '';
};
</script>
<style scoped>
.form{
    margin-top: 100px;
}
.h1{
    margin-bottom: 200px;
}
</style>