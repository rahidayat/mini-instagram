// untuk status uploader
const STATUS_INITIAL = 0
const STATUS_SAVING  = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED  = 3

// base url api
const BASE_URL = 'http://localhost:3000'

const app = new Vue({
  el: '#app',
  data: {
    images: [],
    activeImage: null,
    newPost: {
      img: ''
    }
  },
  methods:{
    getPictures() {
      let self = this
      axios.get(`${BASE_URL}`)
      .then(response => {
        console.log('ini all images', response.data)
        self.images = response.data
      })
      .catch(err => console.log(err))
    },
    detailImage(item) {
      this.activeImage = item
    },
    appendFile(event) {
      var data = event.target.files || event.dataTransfer.files
      this.newPost.img = data[0]
    },
    uploadImage() {
      let self = this
      console.log('save masuk')
      var data = new FormData()
      data.append('image', self.newPost.img)
      axios.post(`${BASE_URL}/upload`,data)
      .then(response => {
        console.log(response.data)
        self.images.push(response.data)
      })
      .catch(err => console.log(err))
    },
    deleteUpload(item){
      console.log('masuk sini')
      var id = $(this).val()
      axios.get(`${BASE_URL}/delete/${id}`)
      .then(response => {
        console.log('yihaapusss')
      })
      .catch(err => console.log(err))
    }
  },
  created() {
    this.getPictures()
  }
})