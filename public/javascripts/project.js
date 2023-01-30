$(document).ready(function(){
    $.get("/codepanda/fetchallstates",function(data){
        data.map((item)=>{
            console.log(data)
            $('#state').append($('<option>').text(item.statename).val(item.stateid))
        })
    })

    $('#state').change(function(){
        $.get("/codepanda/fetchallcity",{stateid:$('#state').val()},function(data){
            $('#city').empty()
            $('#city').append($('<option>').text("-City-"))
           data.map((item)=>{
               console.log(data)
               $('#city').append($('<option>').text(item.cityname).val(item.zipcode))
           }) 
        })
    })
    
    $('#city').change(function(){
        $('#zipcode').val($('#city').val())
    })
})
