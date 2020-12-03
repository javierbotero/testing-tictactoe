// eslint-disable-next-line import/extensions
import * as logic from './logic.js';
import './assets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

logic.firstLayout();
logic.welcome();

const players = () => {
  logic.selectPlayer();
};

document.getElementById('start').addEventListener('click', players);
