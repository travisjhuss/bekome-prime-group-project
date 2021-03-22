// Components
import ClientForm1Info from '../ClientForm1Info/ClientForm1Info';
import ClientForm2Reasons from '../ClientForm2Reasons/ClientForm2Reasons';
import ClientForm3TherapyPreferences from '../ClientForm3TherapyPreferences/ClientForm3TherapyPreferences';
import ClientForm4ProviderPreferences from '../ClientForm4ProviderPreferences/ClientForm4ProviderPreferences';

const ClientFormRoot = ({ currentPage, handleInputs }) => {
  switch (currentPage) {
    case 1:
      return <ClientForm1Info handleInputs={handleInputs} />;
    case 2:
      return <ClientForm2Reasons handleInputs={handleInputs} />;
    case 3:
      return <ClientForm3TherapyPreferences handleInputs={handleInputs} />;
    case 4:
      return <ClientForm4ProviderPreferences handleInputs={handleInputs} />;
  }
};

export default ClientFormRoot;
