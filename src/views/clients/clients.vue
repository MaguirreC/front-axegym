<template>
<form class="p-4">
  <div class="row g-6">
    <div class="col-md-6 mb-3">
      <label for="name" class="form-label">Name <span style="color:red;">*</span></label>
      <input v-model="form.name" type="text" class="form-control form-control-lg" id="name" placeholder="Enter your name" required>
      <div class="invalid-feedback">Name is required.</div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="identification" class="form-label">Identification <span style="color:red;">*</span></label>
      <input v-model="form.identification" type="text" class="form-control form-control-lg" id="identification" placeholder="Enter your identification" required>
      <div class="invalid-feedback">Identification is required.</div>
    </div>
  </div>
  <div class="row mb-6">
    <div class="col-md-6 mb-3">
      <label for="phoneNumber" class="form-label">Phone Number <span style="color:red;">*</span></label>
      <input v-model="form.phoneNumber" type="text" class="form-control form-control-lg" id="phoneNumber" placeholder="Enter your phone number" required>
      <div class="invalid-feedback">Phone number is required.</div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="dateOfBirth" class="form-label">Date of Birth <span style="color:red;">*</span></label>
      <input v-model="form.dateOfBirth" type="date" class="form-control form-control-lg" id="dateOfBirth" required>
      <div class="invalid-feedback">Date of birth is required.</div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary mt-3" @click="onSubmit">Submit</button>
</form>
</template>
<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus'

const apiBaseUrl = import.meta.env.VITE_API_URL;
const form= reactive({
  name:'',
  identification:'',
  phoneNumber:'',
  dateOfBirth:''

});
const onSubmit = async()=>{
  event.preventDefault();
  console.log('boton funcionando')
  newClient()
}
const newClient = async()=>{
  const url = `${apiBaseUrl}/clients`
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
                    message: 'client successfully added    .',
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
 .form-container {
    max-width: 900px; /* Ajusta este valor según el tamaño deseado */
    margin: 0 auto;
  }
  .form-control-lg {
    font-size: 1.25rem; /* Aumenta el tamaño del texto */
  }
</style>