import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import { Logo } from 'components/Icons/Logo';
import { GitHub } from 'components/Icons/SocialIcons';

const ACTIVE_CLASS = 'link--active';

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
        active === selected ? ACTIVE_CLASS : '';

    render() {
        const { section } = this.props;

        return (
            <header className="header">
                <Container type="header">
                    <Link to="/" className="header__logo-link">
                        <Logo />
                    </Link>
                    <div
                        className="header__mobile-menu"
                        onClick={this.toggleHamburguerState}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <nav className={this.state.isOpen ? 'open' : ''}>
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
                            About me
                        </Link>
                        <a
                            className="github-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/enmanuelduran/enmascript">
                            <GitHub />
                            GitHub
                        </a>
                    </nav>
                </Container>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
