<template>
    <div class="row g-6">
        <div class="col-md-6 mb-3">
            <el-select
      v-model="form.membershipPlanId"
      placeholder="Select a membership plan"
      size="large"
      style="width: 480px"
    >
      <el-option
        v-for="plan in plans"
        :key="plan.id"
        :label="plan.name"
        :value="plan.id"
      />
    </el-select>
        </div>
    </div>
    <div class="row g-">
        <div class="col-md-12 mb-3">
          <div class="input-group mb-6">
      <input
        type="text"
        class="form-control"
        placeholder="Search client by ID..."
        v-model="searchQuery"
        @keyup.enter="searchClient"
      />
      <button class="btn btn-primary" @click="searchClient">Search</button>
    </div>
        </div>
    </div>
    
    <!-- Show large user icon before searching -->
    <div v-if="!searchQuery && !foundClient" class="text-center mt-4">
      <i class="bi bi-person-circle text-secondary" style="font-size: 100px;"></i>
      <p class="text-muted">Search for a client by ID to display their information</p>
    </div>

    <!-- Client Card if found -->
    <div v-else-if="foundClient" class="d-flex justify-content-center mt-4">
      <ClientCard :client="foundClient" showButtons="true" @delete-client="confirmDelete" />
    </div>

    <!-- Message if not found -->
    <p v-else-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>

    <div class="row g-6">
        <div class="col-md-6 mb-3 mt-3">
          <button type="button" class="btn btn-primary" @click="onSubmit">Submit</button>
        </div>
    </div>
</template>
<script setup>
import ClientCard from '../../components/ClientCard.vue'
import { onMounted, reactive, ref } from 'vue'
import axios from "axios";
import { ElMessage } from 'element-plus'

const apiBaseUrl = import.meta.env.VITE_API_URL;
const searchQuery = ref("");
const foundClient = ref(null);
const errorMessage = ref("");

const plans=ref([])

const form=reactive({
  membershipPlanId:'',
  clientId:null
})

const onSubmit = async()=>{
  event.preventDefault();
  console.log('boton funcionando')
  newMembership()
}
const fetchPlans= async()=>{
  try{
        console.log('trayendo planes')
        const response = await axios.get(`${apiBaseUrl}plan`);
        plans.value = response.data;
    }catch(error){
        console.log('error bringin plans ')

    }
}
const searchClient = async () => {
  if (!searchQuery.value) return;

  try {
    const response = await axios.get(`${apiBaseUrl}/clients/search`, {
      params: { identification: searchQuery.value },
    });

    foundClient.value = response.data;
    form.clientId= response.data.id
    console.log('el id del cliente es: ',form.clientId)
    errorMessage.value = "";
  } catch (error) {
    foundClient.value = null;
    errorMessage.value = "Client not found.";
  }
};

const newMembership = async()=>{
  const url = `${apiBaseUrl}/membership`
  const dataForm={
    clientId: form.clientId,
    membershipPlanId:form.membershipPlanId,
    
  }
  try{
    axios.post(url,dataForm)
          .then(function(response){
            console.log(response);
            ElMessage({
                    message: 'membership successfully added    .',
                    type: 'success',
                })
                
          })
          .catch(function(error){
            console.log(error)
          });
  } catch(error){
    console.error('error membership')
  }
}
onMounted(()=>{
  fetchPlans()
})
</script>