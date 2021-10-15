import React from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";

export default function Duration(props) {
    return (
        <Col md={props.md ?? "2"} className={props.className}>
            <FormGroup>
                <Label>{props.label}</Label>
                <Input
                    type={props.type}
                    required
                    min={props.min || 0}
                    max={props.max || 100}
                    onChange={props.changeHandler}
                    disabled={props.disabled ?? false}
                    value={props.value ?? ''}
                />
            </FormGroup>
        </Col>
    );
}
