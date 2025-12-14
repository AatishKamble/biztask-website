import {  FaCalendarAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
const BusinessSchedule = ({Details})=>{
 const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };
   const workingDays = Details?.workingDays;
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    return (

        <>
        
        <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={4}
                    variants={fadeUp}
                    className="rounded-3xl p-8  md:p-10   bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 shadow-lg  transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-200">
                      <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg">
                        <FaCalendarAlt className="text-xl text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-green-900">Business Hours</h3>
                    </div>
        
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-green-100">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <BsClock className="text-green-600" />
                          Weekly Schedule
                        </h4>
                        <div className="space-y-2">
                          {allDays.map((day) => {
                            const isWorking = workingDays?.includes(day);
                            return (
                              <motion.div
                                key={day}
                                className="flex justify-between items-center py-3 px-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-200"
                                whileHover={{ x: 5 }}
                              >
                                <span className="font-semibold text-gray-700 flex items-center gap-2">
                                  <span className={`w-3 h-3 rounded-full ${isWorking ? 'bg-green-500' : 'bg-red-500'} shadow-lg`}></span>
                                  {day}
                                </span>
                                <span className={`font-bold px-3 py-1 rounded-lg ${isWorking ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                                  {isWorking ? 'Open' : 'Closed'}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
        
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-sm border-2 border-green-200"
                          whileHover={{ scale: 1.05, y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-center">
                            <div className="w-20 h-20  bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                              <BsClock className="text-white text-3xl " />
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Operating Hours</h4>
                            <div className="space-y-3">
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200">
                                <p className="text-sm text-gray-600 font-semibold mb-1">Opens At</p>
                                <p className="text-2xl md:text-3xl font-bold text-green-600">
                                  {formatTime(Details?.openingTime)}
                                </p>
                              </div>
                              <div className="text-gray-400 font-bold text-lg">to</div>
                              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-4 border-2 border-red-200">
                                <p className="text-sm text-gray-600 font-semibold mb-1">Closes At</p>
                                <p className="text-2xl md:text-3xl font-bold text-red-600">
                                  {formatTime(Details?.closingTime)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
        </>
    );
}

export default BusinessSchedule;