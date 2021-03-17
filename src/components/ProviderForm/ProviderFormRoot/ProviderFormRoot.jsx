// Components
import ProviderForm1Info from '../ProviderForm1Info/ProviderForm1Info';
import ProviderForm2TherapyQualities from '../ProviderForm2TherapyQualities/ProviderForm2TherapyQualities';
import ProviderForm3Treatments from '../ProviderForm3Treatments/ProviderForm3Treatments';
import ProviderForm4Questions from '../ProviderForm4Questions/ProviderForm4Questions';
import ProviderForm5Offerings from '../ProviderForm5Offerings/ProviderForm5Offerings';

const ProviderFormRoot = ({ currentPage, handleInputs }) => {
  switch (currentPage) {
    case 1:
      return <ProviderForm1Info handleInputs={handleInputs} />;
    case 2:
      return <ProviderForm2TherapyQualities handleInputs={handleInputs} />;
    case 3:
      return <ProviderForm3Treatments handleInputs={handleInputs} />;
    case 4:
      return <ProviderForm4Questions handleInputs={handleInputs} />;
    case 5:
      return <ProviderForm5Offerings handleInputs={handleInputs} />;
  }
};

export default ProviderFormRoot;
