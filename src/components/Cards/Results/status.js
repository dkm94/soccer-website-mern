import PauseIcon from '@mui/icons-material/Pause';
import ScheduleIcon from '@mui/icons-material/Schedule';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const status = {
  IN_PLAY: {
    title: 'in play',
    style: 'status-inplay',
    icon: <OndemandVideoIcon />
  },
  FINISHED: {
    title: 'finished',
    style: 'status-finished'
  },
  PAUSED: {
    title: 'paused',
    style: 'status-paused',
    icon: <PauseIcon />
  },
  TIMED: {
    title: 'timed',
    style: 'status-scheduled',
    icon: <ScheduleIcon />
  },
  SCHEDULED: {
    title: 'scheduled',
    style: 'status-scheduled',
    icon: <CalendarMonthIcon />
  }
};

export default status;
