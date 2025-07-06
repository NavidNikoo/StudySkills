import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React, { useState, forwardRef } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

const localizer = momentLocalizer(moment);

function Calendar() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        location: '',
        start: new Date(),
        end: new Date(),
    });
    const [currentDate, setCurrentDate] = useState(new Date());
    const [pickerOpen, setPickerOpen] = useState(false);
    const [currentView, setCurrentView] = useState('month');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [showMiniEditor, setShowMiniEditor] = useState(false);
    const [editorPosition, setEditorPosition] = useState({ top: 0, left: 0 });

    const handleSelectSlot = ({ start, end, box }) => {
        if (pickerOpen) return;
        const rect = box?.clientRect || { top: 0, left: 0 };
        setNewEvent({ title: '', location: '', start, end });
        setEditorPosition({ top: rect.top + 30, left: rect.left + 100 });
        setShowMiniEditor(true);
    };

    const handleSave = () => {
        setEvents([...events, newEvent]);
        setShowMiniEditor(false);
    };

    const goToToday = () => setCurrentDate(new Date());
    const goToPrev = () => setCurrentDate(moment(currentDate).subtract(1, 'month').toDate());
    const goToNext = () => setCurrentDate(moment(currentDate).add(1, 'month').toDate());

    const CustomDateButton = forwardRef(({ value, onClick }, ref) => (
        <Button variant="outline-primary" onClick={onClick} ref={ref}>📅</Button>
    ));

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                <ButtonGroup>
                    <div>
                        <DatePicker
                            selected={currentDate}
                            onChange={(date) => {
                                setCurrentDate(date);
                                setIsCalendarOpen(false);
                            }}
                            open={isCalendarOpen}
                            onClickOutside={() => setIsCalendarOpen(false)}
                            onCalendarOpen={() => setPickerOpen(true)}
                            onCalendarClose={() => setPickerOpen(false)}
                            onInputClick={() => setIsCalendarOpen(prev => !prev)}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            todayButton="Today"
                            preventOpenOnFocus
                            showPopperArrow={false}
                            customInput={<CustomDateButton />}
                        />
                    </div>
                    <Button variant="outline-primary" onClick={goToPrev}>←</Button>
                    <Button variant="outline-primary" onClick={goToNext}>→</Button>
                    <Button variant="outline-primary" onClick={goToToday}>Today</Button>
                </ButtonGroup>
                <h5 className="mb-0">{moment(currentDate).format('MMMM YYYY')}</h5>
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

            {showMiniEditor && (
                <div
                    style={{
                        position: 'absolute',
                        top: editorPosition.top,
                        left: editorPosition.left,
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        width: '260px',
                        zIndex: 1000
                    }}
                >
                    <h6>New Event</h6>
                    <input
                        type="text"
                        placeholder="Event Title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Location or Video Call"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="datetime-local"
                        value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                        className="form-control mb-2"
                    />
                    <input
                        type="datetime-local"
                        value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                        className="form-control mb-2"
                    />
                    <Button onClick={handleSave}>Save</Button>
                </div>
            )}
        </div>
    );
}

export default Calendar;
