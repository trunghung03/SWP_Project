import { Widgets } from '@mui/icons-material';
import { createChatBotMessage } from 'react-chatbot-kit';
import DirectSalesStaffBtn  from './DirectSalesStaffBtn'; // Ensure this is the correct path

const botName = 'DIAN';
const config = {
  initialMessages: [createChatBotMessage(`Hello! Welcome to DIAN. How can I assist you today?`, { widget: 'startBtn' })],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
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
