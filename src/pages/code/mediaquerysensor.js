import React from 'react';
import Layout from '../../components/layout';
import Helmet from 'react-helmet';
import Container from '../../components/Container';
import * as styles from './mediaquerysensor.module.scss';
import * as containerStyles from '../../components/Container/Container.module.scss';
import * as coverStyles from './cover.module.scss';

let MQS = {};

class MediaQuerySensor extends React.Component {
    state = {
        text: '',
        color: ''
    };

    mobileHandler = () => {
        this.setState({
            text: 'Mobile',
            color: '#F23C50'
        });
        console.log('Mobile');
    };

    tabletHandler = () => {
        this.setState({
            text: 'Tablet',
            color: '#FFCB05'
        });
        console.log('Tablet');
    };

    desktopHandler = () => {
        this.setState({
            text: 'Desktop',
            color: '#4AD9D9'
        });
        console.log('Desktop');
    };

    removeSensor = sensorRef => () => MQS.remove(sensorRef);

    getActiveSensors = () => console.log(MQS.get());

    componentDidMount() {
        if (typeof window !== 'undefined') {
            MQS = require('mediaquerysensor');

            MQS.add({
                ref: 'mobileSensor',
                mediaQuery: '(max-width: 767px)',
                action: this.mobileHandler
            });
            MQS.add({
                ref: 'tabletSensor',
                mediaQuery: '(min-width: 768px) and (max-width: 990px)',
                action: this.tabletHandler
            });
            MQS.add({
                ref: 'desktopSensor',
                mediaQuery: '(min-width: 991px)',
                action: this.desktopHandler
            });
        }
    }

    componentWillUnmount() {
        MQS.empty();
    }

    render() {
        return (
            <Layout section="code">
                <Helmet title="MediaQuerySensor">
                    <link rel="canonical" href="/code/mediaquerysensor" />
                </Helmet>
                <div className={coverStyles.cover}>
                    <Container classes={`${containerStyles.containerArticle} ${coverStyles.container}`}>
                        <h2>MQS</h2>
                        <div>MediaQuerySensor</div>
                    </Container>
                </div>
                <Container classes={containerStyles.containerArticle}>
                    <p>
                        MQS is a very simple event wrapper for the
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://developer.mozilla.org/es/docs/Web/API/Window/matchMedia">
                            {' '}
                            window.matchMedia
                        </a>{' '}
                        api, it allows you to add listeners to media
                        queries/breakpoints so that you can execute functions
                        based on them, it's very similar to the resize event
                        listener but more performant.
                    </p>
                    <p>
                        This page has been created mainly for demo purposes, if
                        you want to know more of how it works you can go to the{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/enmanuelduran/mediaquerysensor">
                            documentation page in github.
                        </a>
                    </p>
                    <h3>Demo</h3>
                    <p>
                        Open your console, keep an eye on it as well as in the
                        first box below, I want you to resize the window
                        horizontally from 360px to +1000px multiple times.
                    </p>
                    <div
                        className={styles.mqsResult}
                        style={{ backgroundColor: this.state.color }}>
                        You are in <strong>{this.state.text}</strong>
                    </div>
                    <button className={styles.mqsDemoButton} onClick={this.removeSensor('mobileSensor')}>
                        Remove mobile sensor
                    </button>
                    <button className={styles.mqsDemoButton} onClick={this.removeSensor('tabletSensor')}>
                        Remove tablet sensor
                    </button>
                    <button className={styles.mqsDemoButton} onClick={this.removeSensor('desktopSensor')}>
                        Remove desktop sensor
                    </button>
                    <button className={styles.mqsDemoButton} onClick={MQS.empty}>Remove All</button>
                    <button className={styles.mqsDemoButton} onClick={this.getActiveSensors}>
                        Get Active Sensors
                    </button>
                    <p>
                        Notice the change of state and the console logs that
                        appear, also see how the console logs stop appearing
                        depending on the sensor you remove when clicking a
                        yellow button. You can also realize that when you click
                        "Get Active Sensors" it console logs an object with all
                        the active sensors and their properties.
                    </p>
                    <p>
                        <strong>Important Note:</strong> For this demo we're
                        using react because EnmaScript is based on it but you
                        can use MQS with raw javascript or the framework/library
                        of your preference.
                    </p>
                    <h3>Adding the sensors</h3>
                    <p>
                        We have 3 functions and each of them is executed in a
                        given breakpoint, these are the functions.
                    </p>
                    <pre className="language-javascript">
                        <code className="language-javascript">
                            {`mobileHandler = () => {
    this.setState({
        text: 'Mobile',
        color: '#F23C50'
    });
    console.log('Mobile');
};

tabletHandler = () => {
    this.setState({
        text: 'Tablet',
        color: '#FFCB05'
    });
    console.log('Tablet');
};

desktopHandler = () => {
    this.setState({
        text: 'Desktop',
        color: '#4AD9D9'
    });
    console.log('Desktop');
};`}
                        </code>
                    </pre>
                    <p>
                        Now we use MQS to bind the functions to the
                        corresponding breakpoints when the component mounts:
                    </p>
                    <pre className="language-javascript">
                        <code className="language-javascript">
                            {`MQS.add({
    ref: 'mobileSensor',
    mediaQuery: '(max-width: 767px)',
    action: this.mobileHandler
});

MQS.add({
    ref: 'tabletSensor',
    mediaQuery: '(min-width: 768px) and (max-width: 990px)',
    action: this.tabletHandler
});

MQS.add({
    ref: 'desktopSensor',
    mediaQuery: '(min-width: 991px)',
    action: this.desktopHandler
});`}
                        </code>
                    </pre>
                    <h3>Removing the sensors</h3>
                    <p>
                        To remove the sensors we're adding 4 buttons that use
                        two functions, the first one removes sensors
                        individually by making use of the function{' '}
                        <strong>MQS.remove()</strong>:
                    </p>
                    <pre className="language-javascript">
                        <code className="language-javascript">
                            {`removeSensor = sensorRef => () => MQS.remove(sensorRef);`}
                        </code>
                    </pre>
                    <p>We bind this function to the buttons like:</p>
                    <pre className="language-javascript">
                        <code className="language-javascript">
                            {`<button onClick={this.removeSensor('mobileSensor')}>
    Remove mobile sensor
</button>

<button onClick={this.removeSensor('tabletSensor')}>
    Remove tablet sensor
</button>

<button
    onClick={this.removeSensor('desktopSensor')}>
    Remove desktop sensor
</button>`}
                        </code>
                    </pre>
                    <p>
                        The second one removes all the sensors at once and we
                        bind it to the onClick event directly:
                    </p>
                    <pre className="language-javascript">
                        <code className="language-javascript">
                            {`<button onClick={MQS.empty}>Remove All</button>`}
                        </code>
                    </pre>
                    <h3>Getting active sensors</h3>
                    <p>
                        To get all the active sensors we're simply calling the
                        function <strong>MQS.get()</strong> and console logging
                        it when clicking on a button.
                    </p>
                    <pre className="language-javascript">
                        <code className="language-javascript">
                            {`getActiveSensors = () => console.log(MQS.get());

<button onClick={this.getActiveSensors}>
    Get Active Sensors
</button>`}
                        </code>
                    </pre>
                    <p>That's basically it, play around and Have fun.</p>
                </Container>
            </Layout>
        );
    }
}

export default MediaQuerySensor;
