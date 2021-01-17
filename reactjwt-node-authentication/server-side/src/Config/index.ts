import mongoose from 'mongoose';
(mongoose as any).Promise = global.Promise
require('dotenv').config()

mongoose.set('useCreateIndex', true)
mongoose
	.connect(process.env.URL, { useNewUrlParser: true })
	.then(() => console.log('connected'))
	.catch((err) => console.log('not connected'));

export default mongoose