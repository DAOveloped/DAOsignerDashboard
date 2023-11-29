
import PropTypes from 'prop-types';

const Footer = ({ showFooter }) => {
    return (
        <div
            className="custom-footer"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '75px',
                background: 'var(--footer-color)',
                color: '#fff',
                display: showFooter ? 'flex' : 'none',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 9999,
                fontSize: '1.4rem',
            }}
        >
            <div style={{ marginLeft: '8.5em' }}>Centralized platforms</div>
            <div style={{ marginRight: '8em' }}>Decentralized platforms</div>
        </div>
    );
};

Footer.propTypes = {
    showFooter: PropTypes.bool.isRequired,
};


export default Footer;
