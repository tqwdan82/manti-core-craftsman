import TextFieldsIcon from './TextField/icon';
import TextFieldCom from './TextField/index';
import TextFieldButton from './TextField/button';
import TextFieldDialog from './TextField/dialog';
import TextAreaIcon from './TextArea/icon';
import TextAreaCom from './TextArea/index';
import TextAreaButton from './TextArea/button';
import TextAreaDialog from './TextArea/dialog';
import DatepickerIcon from './Datepicker/icon';
import DatepickerCom from './Datepicker/index';
import DatepickerButton from './Datepicker/button';
import DatepickerDialog from './Datepicker/dialog';


export const TextField = {
    Component:TextFieldCom, 
    Button: TextFieldButton, 
    Icon: TextFieldsIcon,
    Dialog: TextFieldDialog
};
export const TextArea = {
    Component:TextAreaCom, 
    Button: TextAreaButton, 
    Icon: TextAreaIcon,
    Dialog: TextAreaDialog
};
export const Datepicker = {
    Component:DatepickerCom, 
    Button: DatepickerButton, 
    Icon: DatepickerIcon,
    Dialog: DatepickerDialog
};