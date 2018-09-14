module.exports = {

  database: process.env.DATABASE || 'mongodb://root:ab12345@ds139951.mlab.com:39951/tradeb2b',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'tradeb2b',

}
