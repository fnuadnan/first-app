export default function log(req: any, res: any, next: () => void) {
	console.log('Logging...');
	next();
}