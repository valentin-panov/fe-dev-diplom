import React, { memo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { Button, Checkbox, ConfigProvider, DatePicker, Form, Input, Radio, Select } from 'antd';
// eslint-disable-next-line camelcase
import ru_RU from 'antd/lib/locale/ru_RU';
import moment, { Moment } from 'moment';
import s from './PassengerCard.module.scss';
import { OrderSeat } from '../../../../../interfaces/Interfaces';

const { Option } = Select;

export type Props = {
  element: OrderSeat;
  nextPassengerHandler: (data: OrderSeat, nextKey: string) => void;
  activeKey: string;
};
type AgeGroup = 'child' | 'toddler' | 'adult';

export const PassengerCard = memo<Props>(({ element, nextPassengerHandler, activeKey }) => {
  const forward = useRef(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
  const nextKey = (Number(activeKey) + 1).toString();
  const data: OrderSeat = { ...element };

  useEffect(() => {
    const { is_child: child, include_children_seat: toddler } = element;
    if (child) {
      setAgeGroup('child');
    }
    if (toddler) {
      setAgeGroup('toddler');
    }
  }, [element]);

  // ANTD
  const disabledDate = (current: Moment) =>
    // Restricts select days after today
    current && current > moment().endOf('day');

  // const layout = {
  //   labelCol: { span: 8 },
  //   wrapperCol: { span: 16 },
  // };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} не валидный адрес',
      number: '${label} не валидное значение',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <div className={s.cardBody} ref={forward}>
      <Form layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <div className={cn(s.row)}>
          <div className={cn(s.row_age, s.row_padding)}>
            <Select className={s.ageGroupSelect} value={ageGroup} disabled onChange={() => {}}>
              <Option value="adult">Взрослый</Option>
              <Option value="child">Детский</Option>
              <Option value="toddler">Младенец</Option>
            </Select>
          </div>
          <div className={cn(s.row_padding, s.row_personal)}>
            <Form.Item name={['user', 'last_name']} label="Фамилия" rules={[{ required: true }]}>
              <Input className={s.inputField} placeholder="Фамилия" />
            </Form.Item>
            <Form.Item name={['user', 'first_name']} label="Имя" rules={[{ required: true }]}>
              <Input className={s.inputField} placeholder="Имя" />
            </Form.Item>
            <Form.Item name={['user', 'patronymic']} label="Отчество" rules={[{ required: true }]}>
              <Input className={s.inputField} placeholder="Отчество" />
            </Form.Item>
          </div>
          <div className={cn(s.row_gender, s.row_padding)}>
            <Form.Item label="Пол" name="gender" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio.Button value="male">М</Radio.Button>
                <Radio.Button value="female">Ж</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Дата рождения" name="birthday" rules={[{ required: true }]}>
              {/* eslint-disable-next-line camelcase */}
              <ConfigProvider locale={ru_RU}>
                <DatePicker placeholder="ДД/ММ/ГГ" format="DD/MM/YY" disabledDate={disabledDate} />
              </ConfigProvider>
            </Form.Item>
          </div>
          <div className={cn(s.row_padding, s.row_limited)}>
            <Form.Item name="invalid" valuePropName="checked">
              <Checkbox>ограниченная подвижность</Checkbox>
            </Form.Item>
          </div>
          <div className={cn(s.row_paper, s.row_padding)}>
            <Form.Item label="Документ" name="document_type" rules={[{ required: true }]}>
              <Select defaultActiveFirstOption showArrow defaultValue="pass" allowClear={false}>
                <Select.Option value="pass">паспорт</Select.Option>
                <Select.Option value="birth">свидетельство о рождениии</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Номер" name="document_data" rules={[{ required: true }]}>
              <Input placeholder="Номер" />
            </Form.Item>
          </div>
          <div className={cn(s.row_btn, s.row_padding)}>
            <Button className={s.btn} onClick={() => nextPassengerHandler(data, nextKey)}>
              Следующий пассажир
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
});
