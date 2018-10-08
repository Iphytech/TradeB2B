module.exports = {

  database: process.env.DATABASE || 'mongodb://root:password@ds139951.mlab.com:39951/name',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || '',

}
