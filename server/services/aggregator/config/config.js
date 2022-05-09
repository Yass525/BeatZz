const serverSettings = {
    port: process.env.PORT || 3000
    //ssl: require('./ssl')
  }

const servicesSettings = {
  services:{
    auth:{
      url:"http://www.beatzz.tech",
      port:3001
    },
    streaming:{
    url:"http://www.beatzz.tech",
    port:3002
    },
    user:{
    url:"http://www.beatzz.tech",
    port:3003
    }
  }
}
  
export default Object.assign({}, {serverSettings, servicesSettings })