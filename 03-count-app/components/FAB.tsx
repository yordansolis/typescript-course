import { Text, Pressable, StyleSheet } from 'react-native'

interface Props {
    label: string;



    onPress?: () => void; // fuctions not recevi not
    onLongPress?: () => void;


    positions?: 'left' | 'rigth'
}

export default function FAB({ label,
    onPress,
    onLongPress,
    positions, }: Props) {


    return (
        <>


            <Pressable



                style={({ pressed }) =>
                    [
                        styles.floatingButton,
                        positions === 'left' ? styles.positionLeft : styles.positionRigith,

                        pressed ? { opacity: 0.5 } : null,
                    ]

                }

                onPress={onPress}
                onLongPress={onLongPress} // Sirve 
            >

                <Text style={styles.plusText}> {label} </Text>

            </Pressable>
        </>

    )
}

const styles = StyleSheet.create({

    floatingButton: {
        position: 'absolute',
        bottom: 20,
        // right: 20,
        backgroundColor: '#5856D6',
        borderRadius: 50,
        padding: 15,
    },


    countText: {
        textAlign: 'center',
        fontSize: 20,
    },


    plusText: {
        color: 'white',
        fontSize: 20,
    },


    positionRigith: {
        right: 20,
    },


    positionLeft: {
        left: 20,
    },





})