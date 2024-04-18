import React from 'react';

export const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: '5%', // 5% away from the bottom
        width: '100%', // Occupy full width
        display: 'flex',
        justifyContent: 'space-around', // Evenly space the buttons
        padding: '0 10%', // Add padding on left and right sides
        boxSizing: 'border-box' // Include padding in width calculation
    }
};