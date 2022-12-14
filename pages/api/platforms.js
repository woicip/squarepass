export default function handler(req, res){
    res.status(200).json({ code: 200, result: { platforms: [] } });
}