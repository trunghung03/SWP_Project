import { Widgets } from '@mui/icons-material';
import { createChatBotMessage } from 'react-chatbot-kit';
import DirectSalesStaffBtn  from './DirectSalesStaffBtn'; 

const botName = 'DIAN JEWELRY';
const config = {
  initialMessages: [createChatBotMessage(`Hello! Welcome to DIAN JEWELRY. How can I assist you today?`, { widget: 'startBtn' })],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#1c1c1c',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  widgets: [
    {
      widgetName: "StartBtn",
      widgetFunc: (props) => <DirectSalesStaffBtn {...props} />,
    }
  ]
};

export default config;
