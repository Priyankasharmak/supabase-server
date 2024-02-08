const express=require('express');
const app= express();
const port=3000;
const { createClient } = require('@supabase/supabase-js');

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your actual Supabase URL and API Key
const supabase = createClient('https://xnjimghngpaojsbgzncq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuamltZ2huZ3Bhb2pzYmd6bmNxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzM3MjI2NSwiZXhwIjoyMDIyOTQ4MjY1fQ.BDpf613XC5OcAjwDwXqWgkMKt3T4SjnarfpcniuBPbo');


app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hi this is priya')
});
app.get('/update',async(req,res)=>{
    
    const { name, id } = req.body;


    try {
        // Update data in 'your_table_name' where 'id' equals 1
        const { data, error } = await supabase
            .from('ka')
            .update({ name: name })
            .eq('id', id);

        if (error) throw error;

        res.send('Data updated successfully:'+ data);
    } catch (error) {
        res.send('Error updating data:'+error.message);
    }
}


);
app.get('/create',async(req,res)=>{
    
    try {
        // Data to be inserted
        const { name, id } = req.body;
        const dataToInsert = [
            { name: name, id: id },
        ]; 


        // Insert data into 'your_table_name'
        const { data, error } = await supabase
            .from('ka')
            .insert( dataToInsert);

        if (error) throw error;
        res.send("data insert")
       
    } catch (error) {
        res.send("error" +error.message)
       
    }
});
app.get('/read',async (req,res)=>{
    try {
        const { data, error } = await supabase
            .from('ka')
            .select('*');
            
        if (error) throw error;
        
        res.send(data)
    } catch (error) {
        res.send("error" + error.message);
    }
});
app.get('/del/:id',async(req,res)=>{
    const id=req.params.id;

    try {
        // Delete data from 'your_table_name' where 'id' equals 1
        const { data, error } = await supabase
            .from('ka')
            .delete()
            .eq('id', id );

        if (error) throw error;

        res.send('Data deleted successfully:'+ data);
    } catch (error) {
        res.send('Error deleting data:' + error );
    }
    
  
}); 


app.use((req,res)=>{
    res.send('page not found')
})

app.listen(port,()=>{
    console.log('running the server')
})