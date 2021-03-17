// Component imports
import ClientForm1Info from '../ClientForm1Info/ClientForm1Info';
import ClientForm2Reasons from '../ClientForm2Reasons/ClientForm2Reasons';
import ClientForm3TherapyPreferences from '../ClientForm3TherapyPreferences/ClientForm3TherapyPreferences';
import ClientForm4ProviderQualities from '../ClientForm4ProviderQualities/ClientForm4ProviderQualities';
import ClientForm5ProviderPreferences from '../ClientForm5ProviderPreferences/ClientForm5ProviderPreferences';

const ClientFormRoot = ({ currentPage, handleInputs }) => {
  switch (currentPage) {
    case 1:
      return <ClientForm1Info handleInputs={handleInputs} />;
    case 2:
      return <ClientForm2Reasons handleInputs={handleInputs} />;
    case 3:
      return <ClientForm3TherapyPreferences handleInputs={handleInputs} />;
    case 4:
      return <ClientForm4ProviderQualities handleInputs={handleInputs} />;
    case 5:
      return <ClientForm5ProviderPreferences handleInputs={handleInputs} />;
  }
};

export default ClientFormRoot;
