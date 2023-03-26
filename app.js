const express =require('express')
const https=require('https')
const bodyparser=require('body-parser')

const app=express()
app.use(bodyparser.urlencoded({extended:true}))

app.get('/', function(req,res){
res.sendFile(__dirname + '/index.html')
})
app.post('/', function(req,res){
    const query=req.body.cityname
    let url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=17df774ad23662e9e57785cb6b06f16a&units=metric"

    https.get(url,function(response){
        
        response.on('data',function(data){
            
        const weather =JSON.parse(data)
        const description =weather.weather[0].description
        const icon =weather.weather[0].icon
        const imagurl= 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
        
        const temp =weather.main.temp
        res.write("<h1> the description goes here :" + description + "</h1>")

        res.write("<p>hello here i got the temp of  :" + query + "</p> " + temp )

        res.write("<img src="+ imagurl+ ">")
        })
    })
})

app.listen(3000, function(){
    console.log("server is listening to port 3000")
})