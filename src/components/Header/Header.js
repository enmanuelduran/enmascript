import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import Logo from './logo.png';
import './Header.scss';

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
                        <img
                            src={Logo}
                            className="header__logo"
                            alt={this.props.title}
                        />
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
                            to="/about-me"
                            className={this.isMenuOptionActive(
                                section,
                                'aboutme'
                            )}>
                            About me
                        </Link>
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
