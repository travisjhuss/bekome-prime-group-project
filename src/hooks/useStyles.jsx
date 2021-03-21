import { makeStyles } from '@material-ui/core/styles';
import Image from './atop-hill.jpeg';

// This hook will allow styling with MUI to be more consistent through components.
// import with "import useStyles from '../../hooks/useStyles'" in a given component
// be sure to declare "const classes = useStyles()" before the return in a component
// ex. className={classes.paper}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  inputs: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chipsSignup: {
    width: '18ch',
    margin: theme.spacing(0.5),
  },
  chips: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  chipButtons: {
    margin: theme.spacing(0.5),
    width: "10ch",
  },
  formTitle: {
    paddingRight: theme.spacing(3),
  },
  formButton: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    width: "20ch",
    fontSize: "1.2em",
  },
  stepperText: {
    fontSize: "0.9em",
  },
  checkboxBox: {
    maxHeight: 400,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  filterButton: {
    padding: "5px 20px",
  },
  filterMenu: {
    backgroundColor: "#e0fbfc",
    color: "#3D5A80",
  },
  cardRoot: {
    margin: "0px 0px",
    height: 650,
    width: 325,
  },
  savedProviderCard: {
    margin: "10px 0px",
    paddingTop: "20px",
    width: 325,
  },
  cardMedia: {
    height: 200,
    width: "85%",
  },
  cardButton: {
    justifyContent: "center",
  },
  cardHeader: {
    padding: 0,
  },
  cardContent: {
    textAlign: "left",
  },
  saveButton: {
    // position: 'relative',
    marginLeft: "15px",
    padding: 0,
  },
  pic: {
    width: 250,
    height: 250,
    objectFit: "cover",
    borderRadius: "50%",
    padding: theme.spacing(3),
  },
  stateSelect: {
    width: 240,
  },
  accordionTitle: {
    alignSelf: "center",
  },
  picPreview: {
    width: 200,
    height: 200,
    objectFit: 'cover',
  },
  adminPanelButton: {
    position: "absolute",
    marginLeft: "15px",
    padding: 0,
  },
  adminModal: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '100px',
    left: '100px',
  },
  landingTypography: {
    color: '#e0fbfc',
    margin: '50px 30px 0px 30px',
  },
  landingButton: {
    width: '200px',
    margin: '32px',
  },
  howWorksText: {
    padding: '10px',
  },
  howWorksButton: {
    width: '200px',
    margin: '10px',
  },
  loginContainer: {
    margin: 'auto',
    width: '400px',
    height: '560px',
  },
  centerContainer: {
    paddingTop: '50px',
    height: '100vh',
    backgroundImage: `url(${Image})`,
  },
  editClientButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '15ch',
  },
  editClientAccordion: {
    display: 'block',
  },
  filterDrawer: {
    width: 300,
  },
  filterListItem: {
    paddingLeft: theme.spacing(4),
  },
  loginBtn: {
    width: '95%',
  },
  loginForm: {
    margin: '30px',
  },
  loginTextField: {
    '& .MuiOutlinedInput-input': {
      padding: '8px 8px',
    },
  },
  submitBtn: {
    width: '150px',
  },
  adminModalInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  questionsFormContainer: {
    margin: theme.spacing(10),
    padding: theme.spacing(3),
  },
  // styling added for ClientCard
  clientCard: {
    backgroundColor: '#FDFEFE',
    // backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/595db0b044024313332d1ef8/1580112394032-GZBYMVB6X78FV1P8S5KK/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/White%2BShiplap%2B1-24.jpg?format=2500w")`,
    // backgroundColor: "#cfd8dc",
    margin: "0px 0px",
    height: 650,
    width: 325,


    // https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/reclaimed-wood-where-to-buy-1571066028.jpg?crop=0.6624353549600376xw:1xh;center,top&resize=768:*
  },
  // styling for interested clients
  interestedClients: {
    // backgroundColor: '#e0fbfc',
    // backgroundImage: `url("https://www.oregonlive.com/resizer/DVqQcCGiR0-cNqvzN17wcBNJKwM=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.oregonlive.com/home/olive-media/width2048/img/events_impact/photo/2016/10/26/21395512-standard.jpg")`,
    background: 'linear-gradient(10deg, #e0fbfc 5%, #FFFFFF 90%)',

  },
}));

export default useStyles;
