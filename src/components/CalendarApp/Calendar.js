import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';
import { Button, ButtonGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

const localizer = momentLocalizer(moment);

function Calendar() {

    const [events, setEvents] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: new Date(),
        end: new Date(),
    });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [pickerOpen, setPickerOpen] = useState(false); // 👈 Tracks if date picker is open

    const handleSelectSlot = ({ start, end }) => {
        if (pickerOpen) return; // 🛑 Prevent modal from opening when date picker is in use
        setNewEvent({ title: '', start, end });
        setModalVisible(true);
    };

    const handleSave = () => {
        setEvents([...events, newEvent]);
        setModalVisible(false);
    };

    const goToToday = () => setCurrentDate(new Date());
    const goToPrev = () => setCurrentDate(moment(currentDate).subtract(1, 'month').toDate());
    const goToNext = () => setCurrentDate(moment(currentDate).add(1, 'month').toDate());

    const [currentView, setCurrentView] = useState('month');



    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                {/* Left: Navigation Buttons Grouped */}
                <ButtonGroup>
                    <div>
                        <DatePicker
                            selected={currentDate}
                            onChange={(date) => setCurrentDate(date)}
                            dateFormat="MMMM d, yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Today"
                            minDate={new Date(1900, 0, 1)}     // ✅ Start of range
                            maxDate={new Date(2100, 11, 31)}   // ✅ End of range
                            onCalendarOpen={() => setPickerOpen(true)}
                            onCalendarClose={() => {
                                setTimeout(() => setPickerOpen(false), 200);
                            }}
                            preventOpenOnFocus={true}
                            showPopperArrow={false}
                            onFocusCapture={() => setPickerOpen(true)}
                            customInput={
                                <Button variant="outline-primary">
                                    📅
                                </Button>
                            }
                        />


                    </div>
                    <Button variant="outline-primary" onClick={goToPrev}>←</Button>
                    <Button variant="outline-primary" onClick={goToNext}>→</Button>
                    <Button variant="outline-primary" onClick={goToToday}>Today</Button>
                </ButtonGroup>

                {/* Center: Current Month Display */}
                <h5 className="mb-0">{moment(currentDate).format('MMMM YYYY')}</h5>

                {/* Right: Empty div to center the heading */}
                <div style={{ width: '160px' }}></div>

                <ButtonGroup>
                    {['month', 'week', 'day', 'agenda'].map(view => (
                        <Button
                            key={view}
                            variant={currentView === view ? 'primary' : 'outline-primary'}
                            onClick={() => setCurrentView(view)}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </Button>
                    ))}
                </ButtonGroup>


            </div>

            {/* Calendar View */}
            <BigCalendar
                view={currentView}
                onView={setCurrentView}
                views={['month', 'week', 'day', 'agenda']}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                style={{ height: '80vh' }}
                onSelectSlot={handleSelectSlot}
                toolbar={false}
            />

            {/* Event Modal */}
            <EventModal
                show={modalVisible}
                onHide={() => setModalVisible(false)}
                onSave={handleSave}
                eventData={newEvent}
                setEventData={setNewEvent}
            />
        </div>
    );
}

export default Calendar;
