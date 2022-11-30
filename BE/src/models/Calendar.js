const mongoose = require('mongoose');
const multer = require('multer');

const calendarSchema = new mongoose.Schema({
    eventname: {
        required : true,
        type: String,
    },
    date: {
        required : true,
        type: Date,
    },
    starttime: {
        required : true,
        type: String,
    },
    endtime: {
        // required : true,
        type: String,
    },
    description: {
        //required : true,
        type: String,
    },
    areaofinterest: [{
        index: {
            type: String,
        }
    }],
    branches: [{
        branch: {
            type: String,
        }
    }],
    mode: {
        // required : true,
        type: String,
    },
    location: {
        type: String,
    },
    link: {
        type: String,
    },
    toDelete: {
        type: Boolean,
        default: false,
    },
    duration: {
        type: String,
        required: true,
    },
    createdBy: {
        // required : true,
        type: String,
    },
    eventimage: {
        type: String,
    }
})

calendarSchema.statics.checkIsAvailable = async function(date, starttime, endtime) {
    const calendar = await Calendar.findOne({
        $and: [
            {date: date},
            { $or: [
                { $and: [
                    {starttime: {$lte: starttime}},
                    {endtime: {$gte: starttime}}
                ]},
                { $and: [
                    {starttime: {$lte: endtime}},
                    {endtime: {$gte: endtime}}
                ]}
            ]}
        ]
    })
    if(!calendar) {
        return true;
    }
    console.log(calendar.date);
    return false;
}

calendarSchema.statics.deleteEvent = async function(id) {
    const calendar = await this.findOneAndDelete({_id: id});
    if(calendar) {
        return true;
    }
    return false;
}

calendarSchema.statics.editEvent = async function (data) {
    const calendar = await this.findOneAndUpdate({_id: data.id},
        {
            $set: {
                eventname: data.eventname,
                date: data.date,
                starttime: data.starttime,
                endtime: data.endtime,
                description: data.description,
                areaofinterest: data.areaofinterest,
                branches: data.branches,
                mode: data.mode,
                location: data.location,
                link: data.link,
                duration: data.duration,
                eventimage: data.eventimage,
            }
        },
        {new: true}
    );
    if(calendar) {
        return true;
    }
    return false;
}

calendarSchema.statics.findeventbyid = async function (id) {
    const calendar = await this.findOne({_id: id});
    if(calendar) {
        return calendar;
    }
    return false;
}

// calendarSchema.statics.requestToDelete = function(name, date, starttime, endtime) {
//     const calendar = this.findOneAndUpdate({name: name, date: date, starttime: starttime, endtime: endtime}, {toDelete: true});
//     if(calendar) {
//         return calendar;
//     }
//     else {
//         console.log('Event not found');
//     }
// }

async function insert_excel(path) {
    try {
        const wb = xlsx.readFile(path);
        const ws = wb.Sheets['Sheet1'];
        const data = xlsx.utils.sheet_to_json(ws);
        for(let i = 0; i < data.length; i++) {
            const calendar = new Calendar(data[i]);
            await calendar.save();
        }
    }
    catch (error) {
        console.log(error);
    }
}




const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;