/**
 * 菜单组件定义
 */

import React from 'react'
import { Link } from 'react-router'


class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    toggle() {

    }

    getMenu(menu) {
        let menuItem = null;

        if (menu.subMenus && menu.subMenus.length) {
            menuItem = (
                <li key={menu.name} className="nav-item">
                    <span className="module">{menu.name}</span>
                    <ul className="pure-menu-list sub-nav">
                        {
                            menu.subMenus.map(subMenu => {
                                return (
                                    <li key={subMenu.name} className="nav-item">
                                        <Link to={'/components/' + subMenu.key} className="module">{subMenu.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li>
            )
        }
        else {
            menuItem = <li className="nav-item"><Link to={'/components/' + menu.key} className="module">{menu.name}</Link></li>
        }

        return menuItem;
    }


    getModule(module) {

    }

    render() {
        const { menu, type } = this.props;

        return (
            {   
                this.getMenu(menu)
            }
        )
    }
}

export default Menu;