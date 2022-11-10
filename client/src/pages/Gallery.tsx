import React, { FC, useState, ChangeEvent } from 'react'

import { Container, Form } from 'react-bootstrap'
import MWButton from '../components/common/MWButton'

interface GalleryProps {
    loading: boolean
}

const Gallery: FC<GalleryProps> = ({ loading }) => {
    const [query, setQuery] = useState<string>('avengers')

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setQuery(e.target.value)
    }
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Search Movies by title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="avenger"
                        name="title"
                        value={query}
                        onChange={handleTextChange}
                    />
                </Form.Group>
                <MWButton loadingState={loading}>
                    {loading ? '...' : 'Submit'}
                </MWButton>
            </Form>
        </Container>
    )
}

export default Gallery
