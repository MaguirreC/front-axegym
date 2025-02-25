<template>
    <el-form :model="form" label-width="120px">
    <el-form-item label="Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Price">
      <el-input v-model="form.price" type="number"></el-input>
    </el-form-item>
    <el-form-item label="Duration">
      <el-select v-model="form.duration" placeholder="Select duration">
        <el-option
          v-for="item in durationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'


const apiBaseUrl = import.meta.env.VITE_API_URL;
const form = reactive({
  name: '',
  price: null,
  duration: '',
});

const durationOptions = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'BIWEEKLY', label: 'Biweekly' },
  { value: 'MONTHLY', label: 'Monthly' },
];
const onSubmit = () => {
  newPlan()
};
const newPlan = async()=>{
  const url = `${apiBaseUrl}/plan`
  const dataForm={
    name: form.name,
    price:form.price,
    duration:form.duration,
   
  }
  try{
    axios.post(url,dataForm)
          .then(function(response){
            console.log(response);
            ElMessage({
                    message: 'plan successfully added    .',
                    type: 'success',
                })
                
          })
          .catch(function(error){
            console.log(error)
          });
  } catch(error){
    console.error('error plan')
  }

}
</script>