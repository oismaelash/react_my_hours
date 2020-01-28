import React, {useState} from 'react'
import {
    NavItem,
    NavLink,
    NavbarBrand,
    Collapse,
    Nav,
    Navbar,
    Button,
    NavbarToggler
} from 'reactstrap';

const NavbarCustom = props => {

    const [openMenuToggle, setOpenMenuToggle] = useState(false);
    const toggle = () => {
        setOpenMenuToggle(!openMenuToggle);
    };

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand>My Hours</NavbarBrand>
            <NavbarToggler onClick={toggle} />
                <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink onClick={e => props.onReportClicked(e)}><Button color='info' >Report Status</Button></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={e => props.onConfigClicked(e)}><Button color='info' >Configuration</Button></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='/'><Button color='info' >Exit</Button></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
        </Navbar>
    );
}

export default NavbarCustom;