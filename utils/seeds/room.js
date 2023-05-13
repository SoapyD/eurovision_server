exports.reset = async() => {

    //REMOVE ALL DATA FOR MODELS WE WANT TO RESET
    let list = [
    {model: "Room"},   
    ]
    await databaseHandler.removeData(list);

    // await exports.create();
}

exports.create = async() => {
    
    let list = {
        model: 'Room'
        ,params:
        [
            {
                room_name: 'test room'
                ,event: 'Final'
            }            
        ]
    }

    let events = await databaseHandler.findData({
        model: "Event"
        ,search_type: "find"
    })
    events = events[0];

    //foreach event
    list.params.forEach((item) => {
        events.forEach((event) => {
            if (event.name == item.event){
                item.event = event._id
                return
            }
        })
    })

    return Promise.all([databaseHandler.createData(list)]);    
}