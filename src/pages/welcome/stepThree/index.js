import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const StepThree = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Training info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput value={data.role} name="role" label={'Role*'} readOnly />
          <TextInput value={data.specialism} name="specialism" label={'Specialism*'} readOnly />
          <TextInput value={data.cohort} name="cohort" label={'Cohort*'} readOnly />
          <TextInput value={data.startDate} name="startDate" label={'Start Date*'} readOnly />
          <TextInput value={data.endDate} name="endDate" label={'End Date*'} readOnly />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepThree;
