import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import { Logo } from 'components/Icons/Logo';
import { GitHub } from 'components/Icons/SocialIcons';
import styles from 'Header.module.scss';

class Header extends React.Component {
    state = {
        isOpen: false
    };

    toggleHamburguerState = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    isMenuOptionActive = (active, selected) =>
        active === selected ? styles.activeLink : '';

    render() {
        const { section } = this.props;

        return (
            <header className={styles.header}>
                <Container classes={styles.headerContainer}>
                    <Link to="/" className={styles.headerLogoLink}>
                        <Logo />
                    </Link>
                    <div
                        className={styles.headerMobileMenu}
                        onClick={this.toggleHamburguerState}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <nav className={`${this.state.isOpen ? styles.open : ''} ${styles.headerNavigation}`}>
                        <Link
                            to="/"
                            className={this.isMenuOptionActive(
                                section,
                                'home'
                            )}>
                            Home
                        </Link>
                        <Link
                            to="/articles"
                            className={this.isMenuOptionActive(
                                section,
                                'articles'
                            )}>
                            Articles
                        </Link>
                        <Link
                            to="/series"
                            className={this.isMenuOptionActive(
                                section,
                                'series'
                            )}>
                            Series
                        </Link>
                        <Link
                            to="/code"
                            className={this.isMenuOptionActive(
                                section,
                                'code'
                            )}>
                            Code
                        </Link>
                        <Link
                            to="/about-me"
                            className={this.isMenuOptionActive(
                                section,
                                'aboutme'
                            )}>
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className={this.isMenuOptionActive(
                                section,
                                'contact'
                            )}>
                            Contact
                        </Link>
                        <a
                            className={styles.headerGithubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/enmanuelduran/enmascript">
                            <GitHub />
                        </a>
                    </nav>
                </Container>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired
};

export default Header;
