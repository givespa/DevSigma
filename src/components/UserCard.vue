<template>
    <div>
        <div class="mt-2">
            <h3>Prueba de desarrollo Sigma</h3>
        </div>

        <div class="m-5">
            <b-row>
                <b-col cols="12" md="6">
                    <div class="m-5">
                        <b-img-lazy fluid src="https://sigma-studios.s3-us-west-2.amazonaws.com/test/sigma-image.png" alt="Image 1"></b-img-lazy>
                    </div>
                </b-col>
                <b-col cols="12" md="6">
                    <div class="mb-2 shadow p-3 mb-5 bg-white card-radius" style="max-width: 25rem">
                        <b-form class="m-4" v-on:submit.prevent="addUser">
                            <div v-if="msg">
                                <b-alert show variant="danger">
                                    {{msg}}
                                    </b-alert>
                            </div>
                            <div v-if="ok">
                                <b-alert show variant="success">
                                    Tu información ha sido recibida satisfactoriamente
                                    </b-alert>
                            </div>
                            
                            <div class="col-md-2 pull-left">
                                <strong> <label class="control-label">Departamento*</label> </strong>
                            </div>

                            <b-form-select class="input-radius mt-1" v-model="selected" @change="getCity()">
                                <option v-for="department in departments" v-bind:value=" { id: department.id, name: department.name }">
                                    {{ department.name }}         
                                    </option>
                            </b-form-select>

                            <div class="mt-2 col-md-2 pull-left">
                                <strong> <label class="control-label">Ciudad*</label> </strong>
                            </div>

                            <b-form-select class="input-radius mt-1" v-model="user.city" autofocus>
                                <option v-for="city in cities">
                                    {{ city.name }}
                                    </option>
                            </b-form-select>

                            <div class="mt-2 col-md-2 pull-left">
                                <strong> <label class="control-label">Nombre*</label> </strong>
                            </div>

                            <b-form-input type="text" class="input-radius mt-1" v-model="user.name"></b-form-input>

                            <div class="mt-2 col-md-2 pull-left">
                                <strong> <label class="control-label">Correo*</label> </strong>
                            </div>

                            <b-form-input type="email" class="input-radius mt-1" v-model="user.email"></b-form-input>

                            <b-button pill variant="danger" class="btn-lg bg-danger text-gray mt-3" type="submit">Enviar</b-button>
                        
                        </b-form>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
      data() {
          return {
              user: [],
              msg: '',
              ok: false,
              departments: [],
              cities: [],
              selected: {id: '68', name: 'SANTANDER'},
              urlLocal: 'http://127.0.0.1:8000/api/',
              urlCitix: 'https://api.citix.com.co/api/'
          }
    },
      methods: {

        addUser() {
            axios.post(this.urlLocal + 'contact/create', 
                {name: this.user.name,
                email: this.user.email,
                state: this.selected.name,
                city: this.user.city}
            ).then(result => {

                if(result.data.msg)
                {
                    this.msg = result.data.msg
                }else{
                    this.msg = ''
                    this.ok = true
                }
            console.log(result.data)
            })
        },

        getDepartment(){
            axios.get(this.urlCitix + 'department/show')
            .then(result => {
            this.departments = result.data
            })
        },

        getCity(){
            axios.get(this.urlCitix + 'city/show?department_id=' + this.selected.id)
            .then(result => {
            this.cities = result.data
            })
        },

    },
    created() {
        this.getDepartment()
        this.getCity()

        axios.get('https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json')
        .then(result => {
        //this.noticias = result.data
        console.log(result)
        })
        .catch(e => {
        this.errors.push(e)
        })
  }
}
</script>

<style scoped>
.card-radius{
    border-radius: 10px 40px
                40px 10px;
}

.input-radius{
    border-radius: 8px 8px
                8px 8px;
}
</style>