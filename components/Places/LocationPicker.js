import { View, Alert, StyleSheet } from 'react-native';
import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'


const LocationPicker = () => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    async function verifyPermission(){
        if (locationPermissionInformation.status == PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
    
        if(locationPermissionInformation.status=== PermissionStatus.DENIED){
            Alert.alert('Access to location is required for this' );
            return false;
        }
    
        return true;
    
    }
    async function getLocationHandler(){

        const hasPermission = await verifyPermission();
        if(!hasPermission){
            return;
        }

        const location = await getCurrentPositionAsync();

        console.log(location);
    }

    function pickerOnMapHandler(){}

  return (
    <View>
        <View style={styles.mapPreview}>
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickerOnMapHandler}>Pick On Map</OutlinedButton>
        </View>
    </View>
  )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center'

    }

});