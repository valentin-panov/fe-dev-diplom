import React, { ReactElement } from 'react';
import { ReactComponent as Rub } from '../svg/rub.svg';
import { ReactComponent as Express } from '../svg/service_express.svg';
import { ReactComponent as WiFi } from '../svg/service_wifi.svg';
import { ReactComponent as Platz } from '../svg/filter_platz.svg';
import { ReactComponent as AC } from '../svg/service_ac.svg';
import { ReactComponent as Cup } from '../svg/service_cup.svg';
import { ReactComponent as Coupe } from '../svg/filter_coupe.svg';
import { ReactComponent as Seat } from '../svg/filter_seat.svg';
import { ReactComponent as Lux } from '../svg/filter_lux.svg';
import { ReactComponent as Forward } from '../svg/icon_dest_forward.svg';
import { ReactComponent as Backward } from '../svg/icon_dest_back.svg';
import { ReactComponent as ArrowRB } from '../svg/arrow_right_black.svg';
import { ReactComponent as ArrowRG } from '../svg/arrow_right_grey.svg';
import { ReactComponent as ArrowRY } from '../svg/arrow_right_yellow.svg';
import { ReactComponent as ArrowLY } from '../svg/arrow_left_yellow.svg';

export const serviceCollection: Map<string, ReactElement> = new Map<string, ReactElement>([
  ['wifi', <WiFi />],
  ['express', <Express />],
  ['ac', <AC />],
  ['cup', <Cup />],
]);

export const carriageType = {
  platz: <Platz />,
  coupe: <Coupe />,
  seat: <Seat />,
  lux: <Lux />,
};

export const iconsCollection = {
  rub: <Rub />,
  forward: <Forward />,
  backward: <Backward />,
  arrowRB: <ArrowRB />,
  arrowRG: <ArrowRG />,
  arrowRY: <ArrowRY />,
  arrowLY: <ArrowLY />,
};
