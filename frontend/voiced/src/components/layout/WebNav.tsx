import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../constants/theme'

export function WebNav() {
    const navigation = useNavigation()

    if (Platform.OS !== 'web') return null

    return (
        <View style={styles.nav}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>
                    {'Voi'}
                    <Text style={styles.logoAccent}>{'ced'}</Text>
                </Text>
            </View>
            <View style={styles.links}>
                <Text style={styles.link}>{'How it works'}</Text>
                <Text style={styles.link}>{'My accommodations'}</Text>
                <TouchableOpacity
                    style={styles.cta}
                    onPress={() => navigation.navigate('Intake' as never)}
                    activeOpacity={0.85}
                >
                    <Text style={styles.ctaText}>{'Get started →'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 18,
        backgroundColor: theme.colors.cream,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        zIndex: 100,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        fontFamily: theme.fonts.display,
        fontSize: 24,
        color: theme.colors.ink,
    },
    logoAccent: {
        color: theme.colors.accent,
        fontStyle: 'italic',
    },
    links: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 28,
    },
    link: {
        fontSize: 14,
        color: theme.colors.soft,
    },
    cta: {
        backgroundColor: theme.colors.accent,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
    },
    ctaText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
})