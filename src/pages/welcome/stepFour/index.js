import Form from '../../../components/form';

const StepFour = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <textarea name="bio" value={data.bio} onChange={setData} maxLength={300}></textarea>
          <p className="text-blue1">*Required</p>
          <p className="text-blue1">{data.bio.length}/300</p>
        </div>
      </Form>
    </>
  );
};

export default StepFour;
