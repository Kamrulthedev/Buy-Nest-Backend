import { addHours, addMinutes, format } from 'date-fns';
import { prisma } from '../../../shared/SharedPrisma';



const convertDateTime = async (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + offset);
}


const InserScheduleInto = async (payload: any) => {
    const { startDate, endDate, startTime, endTime } = payload;

    const interverlTime = 30;

    const schedules = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate)

    while (currentDate <= lastDate) {
        // 09:30  ---> ['09', '30']
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(startTime.split(':')[0])
                ),
                Number(startTime.split(':')[1])
            )
        );

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(endTime.split(':')[0])
                ),
                Number(endTime.split(':')[1])
            )
        );

        while (startDateTime < endDateTime) {
            const s = await convertDateTime(startDateTime);
            const e = await convertDateTime(addMinutes(startDateTime, interverlTime))

            const scheduleData = {
                startDateTime: s,
                endDateTime: e
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime
                }
            });

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                });
                schedules.push(result);
            }
            startDateTime.setMinutes(startDateTime.getMinutes() + interverlTime);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return schedules;
};




const GetAllFrom = async (user: any) => {

};

const GetByIdFrom = async (id: string) => {

};

const DeleteSchedule = async (id: string) => {

};


export const ScheduleService = {
    InserScheduleInto,
    GetAllFrom,
    GetByIdFrom,
    DeleteSchedule
}